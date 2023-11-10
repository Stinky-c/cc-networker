error("This installer is incomplete, and will not install the project currently, please check back later")
local URL = "https://cdn.jsdelivr.net/gh/Stinky-c/cc-networker@master"

-- Download networker downloader
shell.run("wget " .. URL .. "/lualib_bundle.lua")
shell.run("wget " .. URL .. "/download.lua")

-- Download basalt minified
shell.run("wget run https://basalt.madefor.cc/install.lua packed /basalt.lua")

-- Download jackmacwindow's tar library
shell.run("wget https://cdn.jsdelivr.net/gh/MCJack123/CC-Archive@master/tar.lua /bin/tar.lua")
