pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/phucquyet1202/nestjs.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            when {
                expression {
                    return currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                sh 'docker build -t my-nestjs-app .'
            }
        }
        stage('Deploy Docker Container') {
            when {
                expression {
                    return currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                sh 'docker run --env-file./.env -p 4000:4000 --name my-nestjs-container my-nestjs-app'
            }
        }
    }
    post {
        always {
            script {
                def state = currentBuild.result == 'SUCCESS' ? 'success' : 'failure'
                updateGitHubCommitStatus(state, state == 'success' ? 'Build and Tests Passed' : 'Build or Tests Failed')
            }
        }
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}

def updateGitHubCommitStatus(String state, String description) {
    def context = 'ci/jenkins/build'
    def commitSha = env.GIT_COMMIT

    step([
        $class: 'GitHubCommitStatusSetter',
        reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/phucquyet1202/nestjs'],
        contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: context],
        statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', state: state, message: description]]],
        commitShaSource: [$class: 'ManuallyEnteredShaSource', sha: commitSha]
    ])
}
