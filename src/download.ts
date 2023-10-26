if (!fs.exists("/.dev")) {
  error(
    "This is a dev file, and can be safely delete. Please see repo readme to create dev environment or contribute back."
  );
}
const URL: string = "http://localhost:9001"; // Do not include trailing slash

const index: Array<{ dest: string; uri: string }> = [
  { dest: "main.lua", uri: "/main.lua" },
  { dest: "lualib_bundle.lua", uri: "/lualib_bundle.lua" },

  { dest: "lib/event.lua", uri: "/lib/event.lua" },
  { dest: "lib/network.lua", uri: "/lib/network.lua" },
  { dest: "lib/settings.lua", uri: "/lib/settings.lua" },
  { dest: "lib/types.lua", uri: "/lib/types.lua" },
  { dest: "lib/utils.lua", uri: "/lib/utils.lua" },
];

function download(this: void, dest: string, url: string) {
  const res = http.get({
    url: url,
    redirect: true,
    headers: new Map([
      ["User-Agent", "buckydev/cc-networker"],
      ["Client", "minecraft/cc:tweaked"],
    ]),
  } as RequestOptions);
  if (res[0] !== null) {
    const req = res[0] as HTTPResponse;
    const data = req.readAll();
    const file = fs.open(dest, "w");
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
  const dest = file.dest;
  const url = URL + file.uri;

  if (fs.exists(dest)) {
    // print(`'${dest}' exists. Overwriting now...`);
    download(dest, url);
  } else {
    // print(`Downloading '${dest}' now...`);
    download(dest, url);
  }
});
