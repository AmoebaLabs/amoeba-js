module AmoebaJs
  module Rails
    if defined?(Rails) && ::Rails.version >= "3.1"
      class Engine < ::Rails::Engine
      end
    end
  end
end

require 'amoeba_js_rails/version'
