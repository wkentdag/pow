doctype html
html

  head
    block(name='meta')
      meta(charset='utf-8')
      meta(http-equiv='X-UA-Compatible' content='IE=edge, chrome=1')
      meta(name='description' content='')
      meta(name='author' content='wkentdag')
      meta(name="viewport" content="width=device-width, initial-scale=1")

    block(name='title')
      title Passion of the Weiss

    block(name='stylesheets')
      link(rel='stylesheet' href='css/index.css')

  body
    include(src='_header.sml')
    #content
      block(name='content')

    include(src='_navbar.sml')

    block(name='javascript')
      script(src='js/main.js')
