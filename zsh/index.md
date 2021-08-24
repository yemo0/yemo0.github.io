# zsh 配置

zsh安装使用
<!--more-->

1. ### 安装

   ```
   apt install zsh
   
   // 查看
   cat /etc/shells
   // 切换
   sudo chsh -s /usr/bin/zsh
   chsh -s /usr/bin/zsh
   ```

2. ### 安装oh-my-zsh

   ```
   sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
   ```

3. ### 安装Pure

   ```bash
   // pure https://github.com/sindresorhus/pure
   // 使用Nodesource安装高版本nodejs https://github.com/nodesource/distributions
   npm install --global pure-prompt
   mkdir -p "$HOME/.zsh"
   git clone https://github.com/sindresorhus/pure.git "$HOME/.zsh/pure"
   // 创建并写入.zshrc
   vim $HOME/.zshrc
   // .zsrc
   fpath+=$HOME/.zsh/pure
   autoload -U promptinit; promptinit
   prompt pure
   ```

   
