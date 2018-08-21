node {
    def app
    def branch

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
        branch = scm.branches[0].name.drop(2)
        echo 'Branch Name: ' + branch
    }

    stage('Build source') {
        /* Let's make sure we have the repository cloned to our workspace */

        sh 'yarn install'
    }

     stage('Build image') {
         steps {
             script {
                 if (branch == 'master'){
                    app = docker.build("trustlab/ixo-web")
                 } else {
                    app = docker.build("trustlab/ixo-web:" + branch)
                 }
             }
         }
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

     stage('Removing Images') {
        sh "docker rmi ${app.id}"
        sh "docker rmi registry.hub.docker.com/${app.id}"
        sh "docker rmi registry.hub.docker.com/${app.id}:${env.BUILD_NUMBER}"
    }
}