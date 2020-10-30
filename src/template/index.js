export function parseHTML (html, options) {
  while(html){
    if(!lastTag || !isPlainTextElement(lastTag)){
      //父元素为正常元素的处理逻辑
      let textEnd = html.indexOf('<')
      if(textEnd === 0){
        //
      }

      let text, rest, next
      if(textEnd >= 0){
        //
      }
    }else{
      //父元素为script style textarea 的处理逻辑

    }
  }
}