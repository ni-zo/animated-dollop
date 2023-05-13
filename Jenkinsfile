pipeline {
    agent {
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
            steps {
                // Add the steps to launch your app here
                sh 'apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/main --repository http://dl-cdn.alpinelinux.org/alpine/edge/community docker'
'
                sh 'npm install'
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


/*
another sol just use a docker base image then a new container for other commds
pipeline {
    agent { docker { image 'docker:dind' } }
    stages {
        // Other stages...
        stage('Build') {
            steps {
                sh 'docker run --rm -v $(pwd):/app -w /app node:your_node_version npm install'
                sh 'docker build -t daniel0431/jenk:14 .'
            }
        }
        // Other stages...
    }
}*/