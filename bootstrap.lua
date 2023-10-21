settings.load()
local url = settings.get("networker-downloadurl", "...") -- May not end with a slash // TODO: figure out how to serve files
fs.delete("/lualib_bundle.lua")
fs.delete("/download.lua")
shell.run("wget " .. url .. "/lualib_bundle.lua")
shell.run("wget " .. url .. "/download.lua")
