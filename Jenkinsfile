pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }

    environment {
        GITHUB_TOKEN = credentials('github_action') // Lấy token từ Jenkins
    }

    stages {
        stage("Check GITHUB_TOKEN") {
            steps {
                script {
                    echo "GITHUB_TOKEN is: ${env.GITHUB_TOKEN ? 'Available' : 'Not available'}"
                }
            }
        }

        stage("install") {
            steps {
                sh 'npm install'
            }
        }
    
        stage('Trigger GitHub Actions') {
            steps {
                script {
                    def apiUrl = "https://api.github.com/repos/phucquyet1202/nestjs/actions/workflows/node.js.yml/dispatches"

                    // Cập nhật request body để bao gồm event_type và ref đúng
                    def requestBody = '''{
                        "event_type": "jenkins-trigger",
                        "client_payload": {
                            "ref": "refs/heads/master"
                        }
                    }'''

                    echo "API URL: ${apiUrl}"
                    echo "Request Body: ${requestBody}"
                    echo "Authorization Header: Bearer **********"  // Đảm bảo ẩn token thực tế

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
                        echo "Error Details: ${e}"
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
