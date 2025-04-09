const express = require('express')
const mongoose = require('mongoose')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/:slug', async (req, res) => {
    try {
      const article = await Article.findOne({ slug: req.params.slug });
      if (!article) return res.redirect('/');
      res.render('articles/show', { article });
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  });
  


router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        console.log(e)
        res.render('articles/new', { article })
    }
})

router.delete('/:id', async(req, res) =>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  try {
      const article = await Article.findById(req.params.id);
      if (!article) return res.redirect('/');

      res.render('articles/edit', { article });
  } catch (err) {
      console.error(err);
      res.redirect('/');
  }
});

router.put('/:id', async (req, res) => {
  try {
      let article = await Article.findById(req.params.id);
      if (!article) return res.redirect('/');

      article.title = req.body.title;
      article.description = req.body.description;
      article.markdown = req.body.markdown;

      await article.save();
      res.redirect(`/articles/${article.id}`);
  } catch (err) {
      console.error(err);
      res.render('articles/edit', { article: req.body });
  }
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
      } catch (e) {
        res.render(`articles/${path}`, { article: article })
      }
    }
  }
  

module.exports = router
