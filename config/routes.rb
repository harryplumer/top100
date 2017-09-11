Rails.application.routes.draw do
  namespace :api do
    resources :songs, except: [:new, :edit]
    patch 'add_song_to_list/:id', to: 'songs#add_to_list', as: "add_to_list" 
    patch 'remove_song_from_list/:id', to: 'songs#remove_from_list', as: "remove_from_list"  
    patch 'uprank_song/:id', to: 'songs#uprank', as: 'uprank_song'
    patch 'downrank_song/:id', to: 'songs#downrank', as: 'downrank_song'
  end
    
  get '*other', to: 'static#index'
end
