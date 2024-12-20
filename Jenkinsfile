pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
        jdk "OpenJDK8"
        maven "Maven3"
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
 