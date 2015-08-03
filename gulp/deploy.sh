gulp prod
ssh oceanstar 'mkdir -p ~/www/react'
scp -r ../build/* oceanstar:~/www/react
