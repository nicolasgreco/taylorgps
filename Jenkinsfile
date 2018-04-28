node {
  def project = 'taylorgps-198901'
  def appName = 'itinerary'
  def feSvcName = "${appName}-frontend"
  def imageNodeTag = "gcr.io/${project}/node:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  def imageNginxTag = "gcr.io/${project}/nginx:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  def imageVarnishTag = "gcr.io/${project}/varnish:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build images'
  sh("docker build -t ${imageNodeTag} .")
  sh("docker build -t ${imageNginxTag} ./.docker/nginx")
  sh("docker build -t ${imageVarnishTag} ./.docker/varnish")

  //stage 'Run Go tests'
  //sh("docker run ${imageTag} go test")

  stage 'Push image to registry'
  sh("gcloud docker -- push ${imageNodeTag}")
  sh("gcloud docker -- push ${imageNginxTag}")
  sh("gcloud docker -- push ${imageVarnishTag}")

  stage "Deploy Application"
  switch (env.BRANCH_NAME) {
    // Roll out to canary environment
    case "canary":
        // Change deployed image in canary to the one we just built
        sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/canary/*.yaml")
        sh("kubectl --namespace=production apply -f k8s/services/")
        sh("kubectl --namespace=production apply -f k8s/canary/")
        sh("echo http://`kubectl --namespace=production get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
        break

    // Roll out to production
    case "master":
        // Change deployed image in canary to the one we just built
        sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/production/*.yaml")
        sh("kubectl --namespace=production apply -f k8s/services/")
        sh("kubectl --namespace=production apply -f k8s/production/")
        sh("echo http://`kubectl --namespace=production get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
        break

    // Roll out a dev environment
    default:
        // Create namespace if it doesn't exist
        sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
        // Don't use public load balancing for development branches
        sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/reverse-proxy-service.yaml")
        sh("sed -i.bak 's#gcr.io/taylorgps-198901/node:0.0.1#${imageNodeTag}#' ./k8s/dev/*.yaml")
        sh("sed -i.bak 's#gcr.io/taylorgps-198901/node:0.0.1#${imageNginxTag}#' ./k8s/dev/*.yaml")
        sh("sed -i.bak 's#gcr.io/taylorgps-198901/node:0.0.1#${imageVarnishTag}#' ./k8s/dev/*.yaml")
        sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/")
        sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")
        echo 'To access your environment run `kubectl proxy`'
        echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${feSvcName}:80/"
  }
}
