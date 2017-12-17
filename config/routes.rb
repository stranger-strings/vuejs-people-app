Rails.application.routes.draw do
  namespace :v1 do
    get "/people" => "people#index"
  end
end
