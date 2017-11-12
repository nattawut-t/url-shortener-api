kubectl delete service url-shortener-api
kubectl delete deployment url-shortener-api
kubectl run url-shortener-api --image=url-shortener-api:1.0.0 --port=3001
kubectl config view
kubectl expose deployment url-shortener-api --type=LoadBalancer
kubectl get services
minikube service url-shortener-api

#   minikube dashboard