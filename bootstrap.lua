settings.load()
local url = settings.get("networker-downloadurl", "...") -- May not end with a slash // TODO: figure out how to serve files

fs.delete("/lualib_bundle.lua")
fs.delete("/download.lua")
fs.delete("/basalt.lua")

-- Download networker downloader
shell.run("wget " .. url .. "/lualib_bundle.lua")
shell.run("wget " .. url .. "/download.lua")

-- Download basalt minified
shell.run("wget run https://basalt.madefor.cc/install.lua packed /basalt.lua")
