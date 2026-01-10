Rails.application.routes.draw do
  # =========================
  # Devise（HTMLログイン）
  # =========================
  devise_for :users


  # =========================
  # HTML画面（従来Rails）
  # =========================
  root "posts#index"
  resources :posts do
    resources :comments, only: [ :create, :destroy ]
  end
  # =========================
  # API（React用）
  # =========================
  namespace :api do
  resources :posts, only: [ :index, :show, :create, :update, :destroy ] do
    resources :comments, only: [ :index, :create ]
  end
  resources :comments, only: [ :destroy ]
  resources :sessions, only: [ :create, :destroy ]
end


  # =========================
  # Rails内部用
  # =========================

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
