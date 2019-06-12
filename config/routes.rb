Rails.application.routes.draw do
  root "messages#index"
  get "groups" => "messages#show"
end
