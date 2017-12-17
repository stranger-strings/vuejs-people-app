Rails.application.routes.draw do
  namespace :v1 do
    get "/people" => "people#index"
    post "/people" => "people#create"
  end
end
