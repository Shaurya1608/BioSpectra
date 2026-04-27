import React from 'react';
import articlesData from '@/data/articles.json';
import ArticleClient from './ArticleClient';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = articlesData.find(a => a.id === parseInt(id));

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.abstract.substring(0, 160) + '...',
    openGraph: {
      title: article.title,
      description: article.abstract.substring(0, 160) + '...',
      type: 'article',
      publishedTime: article.date,
      authors: article.authors,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = articlesData.find(a => a.id === parseInt(id));

  return <ArticleClient article={article} />;
}
