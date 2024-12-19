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
                    // Đọc tệp .env và xuất các biến môi trường
                    sh '''
                        set -o allexport
                        source /var/jenkins_home/env-files/.env
                        set +o allexport
                    '''
                }
            }
        }
        stage('Build') { 
            steps { 
                sh 'docker build -t quyet240/nestjs:latest .' 
            } 
        } 
        stage('Login to Docker Hub') { 
            steps { 
                script {
                    // Thiết lập các biến môi trường trước khi đăng nhập
                    sh '''
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    '''
                }
            } 
        } 
        stage('Push to Docker Hub') { 
            steps { 
                sh 'docker push quyet240/nestjs:latest' 
            } 
        } 
        stage('Deploy') { 
            steps { 
                sh 'docker run -d -p 8081:8081 --name nestjs-container quyet240/nestjs:latest' 
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
