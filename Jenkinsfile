pipeline {
    agent any
    stages {
        stage("install") {
            steps {
                sh 'npm install'
            }
        }
        stage("build") {
            steps {
                sh 'npm run build'
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