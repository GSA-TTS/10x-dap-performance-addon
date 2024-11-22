setTimeout(() => {
  const articleRoot = document.querySelector('#related-articles-root');
  const template = document.querySelector('#related-articles-template');

  // Clone the template and put it into the DOM
  if(articleRoot && template) {
    const clone = template.content.cloneNode(true);
    articleRoot.appendChild(clone);
  }
}, 500);
