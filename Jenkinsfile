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
        stage('Setup Environment') { 
            steps { 
                script { 
                    def envFile = readFile('/var/jenkins_home/env-files/.env') 
                    def envVars = envFile.split('\n') 
                    for (line in envVars) { 
                        if (line.trim()) { 
                            def parts = line.split('=') 
                            if (parts.length == 2) { 
                                // Thiết lập biến môi trường 
                                sh "export ${parts[0]}='${parts[1]}'" 
                            } 
                        } 
                    } 
                } 
            }
        }
        stage('Build') { 
            steps { 
                sh 'npm run build'
            } 
        } 
        // stage('Start') { 
        //     steps { 
        //         sh 'npm run start'
        //     } 
        // } 
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
