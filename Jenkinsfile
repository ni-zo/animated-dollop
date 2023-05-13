pipeline {
    agent {
        docker { image 'node:18.16.0-alpine'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
         }
        
    }

    environment {
        DOCKER_IMAGE = 'daniel0431/jenk'
    }

    stages {
        stage('Launch App') {
            steps {
                // Add the steps to launch your app here
                sh 'npm i'
                sh 'node index.js'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
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