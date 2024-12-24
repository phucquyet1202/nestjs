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
                    def apiUrl = "https://api.github.com/repos/phucquyet1202/nestjs/actions/workflows/node.js.yml/dispatches"

                    // Cập nhật request body để chỉ bao gồm ref
                    def requestBody = '{"ref": "refs/heads/master"}'
                    try {
                        // Gửi request POST tới GitHub API
                        def response = httpRequest(
                            httpMode: 'POST',
                            url: apiUrl,
                            customHeaders: [
                                [name: 'Authorization', value: "Bearer ${env.GITHUB_TOKEN}"],
                                [name: 'Accept', value: 'application/vnd.github.v3+json']
                            ],
                            requestBody: requestBody,
                            validResponseCodes: '100:599'
                        )
                        echo "GitHub Actions response: ${response.content}"
                    } catch (Exception e) {
                        echo "Error: ${e.message}"
                    }
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
