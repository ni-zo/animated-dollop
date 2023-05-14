pipeline {
    agent {
        docker {
            image 'docker:24-rc-cli'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_IMAGE = 'daniel0431/jenk'
        HOME = '.'
    }

    stages {
        stage('Build And Push Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_NUMBER} ."
            }
            
            post {
                success {
                    script {
                        docker.withRegistry('https://registry.hub.docker.com', 'docker') {
                            def app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                            app.push("${env.BUILD_NUMBER}")
                            app.push("latest")
                        }
                    }
                }
            }
        }
    }
}
