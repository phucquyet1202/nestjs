pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
environment { 
    DOCKER_HOST = "tcp://localhost:2375" 
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
                    // Đọc tệp .env và xuất các biến môi trường
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
                sh 'docker -H tcp://localhost:2375 build -t quyet240/nestjs:latest .'
            } 
        } 
        stage('Login to Docker Hub') { 
            steps { 
                script {
                    // Thiết lập các biến môi trường trước khi đăng nhập
                  sh ''' 
                  echo $DOCKER_PASSWORD | docker -H tcp://localhost:2375 login -u $DOCKER_USERNAME --password-stdin 
                  '''
                }
            } 
        } 
        stage('Push to Docker Hub') { 
            steps { 
                sh 'docker -H tcp://localhost:2375 push quyet240/nestjs:latest'
            } 
        } 
        stage('Deploy') { 
            steps { 
                sh 'docker -H tcp://localhost:2375 run -d -p 8081:8081 --name nestjs-container quyet240/nestjs:latest'
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

def updateGitHubCommitStatus(String state, String description) { 
    def context = 'ci/jenkins/build' 
    def commitSha = env.GIT_COMMIT 
    step([ 
        $class: 'GitHubCommitStatusSetter', 
        reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/phucquyet1202/nestjs.git'], 
        contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: context], 
        statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', state: state, message: description]]], 
        commitShaSource: [$class: 'ManuallyEnteredShaSource', sha: commitSha] 
    ]) 
}
