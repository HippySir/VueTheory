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

      if(textEnd < 0){
        // 纯文本
        text = html;
        html = ''
      }

      if(options.chars && text){
        options.chars(text)
      }

    }else{
      //父元素为script style textarea 的处理逻辑
       
    }
  }
}