pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
       
    }

    stages {
        stage("install") {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') { 
            steps { 
             withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
    sh label: '', script: 'docker build -t quyet240/nestjs:latest .'
    sh label: '', script: 'docker push quyet240/nestjs:latest'

}
            } 
        } 
    }
    post {
        success {
            echo "SUCCESSFUL"
        }
        failure {
            echo "FAILED"
        }
    }
}