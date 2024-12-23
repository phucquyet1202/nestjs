pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
   environment {
        GITHUB_TOKEN = credentials('github_action') // Lấy token từ Jenkins
    }
    stages {
        stage("install") {
            steps {
                sh 'npm install'
            }
        }
    
         stage('Trigger GitHub Actions') {
            steps {
                script {
                   def apiUrl = "https://github.com/phucquyet1202/nestjs/actions/workflows/node.js.yml"

                    def requestBody = '{"ref": "master"}'

                    // Gửi request POST tới GitHub API
                    def response = httpRequest(
                        httpMode: 'POST',
                        url: apiUrl,
                        customHeaders: [
                            [name: 'Authorization', value: "Bearer ${env.GITHUB_TOKEN}"],
                            [name: 'Accept', value: 'application/vnd.github.v3+json']
                        ],
                        requestBody: requestBody
                    )
                    echo "GitHub Actions response: ${response.content}"
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
