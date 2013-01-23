# encoding: utf-8

require 'rubygems'
require 'bundler'
begin
  Bundler.setup(:default, :development)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code
end
require 'rake'

require 'jeweler'
Jeweler::Tasks.new do |gem|
  gem.name = "amoeba-js-rails"
  gem.homepage = "http://github.com/AmoebaConsulting/amoeba-js-rails"
  gem.license = "MIT"
  gem.summary = %Q{A lightweight JS MVC framework extending Backbone JS.}
  gem.description = "Amoeba.js is a lightweight JS MVC framework extending Backbone JS giving some extra help."
  gem.email = "sayhi@amoe.ba"
  gem.authors = ["Amoeba Consulting, LLC."]
end
Jeweler::RubygemsDotOrgTasks.new
