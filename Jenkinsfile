pipeline {
     agent  {
                docker { image 'node:18.16.0-alpine'
                args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
                
            }

    environment {
        DOCKER_IMAGE = 'daniel0431/jenk'
        HOME='.'
    }

    stages {
        stage('Launch App') {
            /*agent  {
                docker { image 'node:18.16.0-alpine'
                args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
                
            }*/
            steps {
                // Add the steps to launch your app here
                sh 'npm install'
                sh 'node index.js'
            }
        }

        stage('Build And Push Docker Image') {
            /*agent  {
                docker { image 'docker:24.0.0-rc.4-cli'
                args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }*/
            

            steps {
                script {
                    app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
            post{
                success {
                    script {
                        docker.withRegistry('https://registry.hub.docker.com', 'docker') {
                            app.push("${env.BUILD_NUMBER}")
                            app.push("latest")
                        }
                    }
                }
            }
        }

 
    }
}
