wifi.setmode(wifi.STATION)
wifi.sta.config({ssid="Seu_SSID", pwd="Sua_Senha"})

srv = net.createServer(net.TCP)
srv:listen(80, function(conn)
    conn:on("receive", function(sck, req)
        local _, _, method, path, vars = string.find(req, "([A-Z]+) (.+)?(.+) HTTP")
        if (method == nil) then
            _, _, method, path = string.find(req, "([A-Z]+) (.+) HTTP")
        end
        if (path == "/data" and method == "POST") then
            local _, _, distance = string.find(vars, "distance=(%d+)")
            if distance then
                file.open("data.lua", "a+")
                file.writeline(distance)
                file.close()
            end
            sck:send("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nData received")
        else
            sck:send("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n")
            sck:send(file.read("www/index.html"))
        end
        sck:on("sent", function(sck) sck:close() end)
    end)
end)
