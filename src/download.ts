settings.load();
const URL: string = settings.get("networker-downloadurl", "..."); // Do not include trailing slash // TODO: figure out how to serve files

let index: Array<{ dest: string; uri: string }> = [
  { dest: "main.lua", uri: "/main.lua" },
  { dest: "lualib_bundle.lua", uri: "/lualib_bundle.lua" },
  { dest: "lib/event.lua", uri: "/lib/event.lua" },
  { dest: "lib/settings.lua", uri: "/lib/settings.lua" },
  { dest: "lib/network.lua", uri: "/lib/network.lua" },
  { dest: "lib/misc.lua", uri: "/lib/misc.lua" },
];

function download(this: void, dest: string, url: string) {
  let res = http.get({
    url: url,
    redirect: true,
    headers: new Map([
      ["User-Agent", "buckydev/cc-networker"],
      ["Client", "minecraft/cc:tweaked"],
    ]),
  } as RequestOptions);
  if (res[0] !== null) {
    let req = res[0] as HTTPResponse;
    let data = req.readAll();
    let file = fs.open(dest, "w");
    if (file[0] === null) {
      error(`Could not open file '${dest}'`);
    }
    file[0]?.write(data);
    file[0]?.close();
    req.close();

    print(`Downloaded ${dest}!`);
  } else {
    error(res[2]);
  }
}

index.forEach((file) => {
  let dest = file.dest;
  let url = URL + file.uri;

  if (fs.exists(dest)) {
    // print(`'${dest}' exists. Overwriting now...`);
    download(dest, url);
  } else {
    // print(`Downloading '${dest}' now...`);
    download(dest, url);
  }
});
