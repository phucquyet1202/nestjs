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
              sh 'npm run build'
            } 
        } 
        stage('Start') { 
            steps { 
              sh 'npm run start'
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