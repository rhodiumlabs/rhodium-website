require 'sinatra'

configure do
  set :views, 'public'
  set :public_folder, 'public'
end

get '*' do 
 erb :index
end
