// pipeline {
//     agent any
    
//     tools {
//         nodejs "nodejs"
//     }

//     stages {
//         stage("install") {
//             steps {
//                 sh 'npm install'
//             }
//         }
//         stage("build") {
//             steps {
//                 sh 'npm run build'
//             }
//         }
//     } 
    
//     post {
//         success {
//             echo "SUCCESSFUL"
//         }
//         failure {
//             echo "FAILED"
//         }
//     }
// }

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
            steps {
                sh 'docker build -t nestjs .'
            }
        }
        stage('Deploy Docker Container') {
            steps {
                sh 'docker run --env-file .env -p 8080:8080 --name nestjs my-nestjs'
            }
        }
    }
    post {
        always {
            script {
                def state = currentBuild.result ?: 'SUCCESS'
                updateGitHubCommitStatus(state == 'SUCCESS' ? 'success' : 'failure', state == 'SUCCESS' ? 'Build and Tests Passed' : 'Build or Tests Failed')
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
