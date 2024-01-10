local url = "http://localhost:9001"

fs.delete("/lualib_bundle.lua")
fs.delete("/download.lua")
fs.delete("/basalt.lua")

-- Download networker downloader
shell.run("wget " .. url .. "/lualib_bundle.lua")
shell.run("wget " .. url .. "/download.lua")

-- Download basalt minified
shell.run("wget run https://basalt.madefor.cc/install.lua release basalt-1.7.1.lua /lib/basalt.lua")

-- Download jackmacwindow's tar library
shell.run("wget https://cdn.jsdelivr.net/gh/MCJack123/CC-Archive@master/tar.lua /bin/tar.lua")
