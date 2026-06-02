# MDSimpson.co.uk

This is the repository for my [mdsimpson.co.uk](https://mdsimpson.co.uk/), my
personal website and blog. I have ported the site from WordPress to a static site
built with Jekyll, hosted on GitHub Pages.

## Installation

The site has been developed on Windows. To run a local version for testing, you will
eed to follow these instructions:

**1 - Download the [Windows Ruby Installer](https://rubyinstaller.org/).**

- Install the version with the dev kit and tick the box at the end to install MSYS2
and the development toolchain.

**2 - Install Jekyll using `gem install jekyll bundler`.**

**3 - You may have to run `bundle install` to install any remaining dependencies.**

More info can be found in the [Jekyll Documentation](https://jekyllrb.com/docs/).

## Running Locally

To run locally, use `bundle exec jekyll serve --livereload`, which will run a local web
server at `http://localhost:4000`.

The page will automatically reload when changes are made.
