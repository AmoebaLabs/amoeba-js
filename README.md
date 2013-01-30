# amoeba-js-rails

Asset Pipeline Integration for Amoeba.js

## Documentation

The documentation is automatically generated from the sourcecode using
[Codo](https://github.com/netzpirat/codo). Codo uses rdoc/yard or markdown style syntax. The latest
documentation should always be with the code, in the `docs/` directory.

Please try to include documentation for any contributions on your classes and functions like so:

```coffeescript
# Base class for all animals.
#
# @example How to subclass an animal
#   class Lion extends Animal
#     move: (direction, speed): ->
#
class Example.Animal

  # The Answer to the Ultimate Question of Life, the Universe, and Everything
  @ANSWER = 42

  # Construct a new animal.
  #
  # @param [String] name the name of the animal
  # @param [Date] birthDate when the animal was born
  #
  constructor: (@name, @birthDate = new Date()) ->

  # Move the animal.
  #
  # @example Move an animal
  #   new Lion('Simba').move('south', 12)
  #
  # @param [Object] options the moving options
  # @option options [String] direction the moving direction
  # @option options [Number] speed the speed in mph
  #
  move: (options = {}) ->
```

## Contributing to amoeba-js-rails

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet.
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it.
* Fork the project.
* Start a feature/bugfix branch.
* Commit and push until you are happy with your contribution.
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2013 Amoeba Consulting (http://amoe.ba). See LICENSE.txt for further details.

