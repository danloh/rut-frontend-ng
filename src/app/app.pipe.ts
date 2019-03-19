import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({name: 'plur'})
export class PlurPipe implements PipeTransform {
  transform(n: number, unit: string): string {
    return n + ' ' + unit + (n <= 1 ? '' : 's')
  }
}

@Pipe({name: 'host'})
export class HostPipe implements PipeTransform {
  transform(url: string): string {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') parts.shift()
    return parts.join('.')
  }
}

@Pipe({name: 'showLess'})
export class ShowLessPipe implements PipeTransform {
  transform(content: string, least = 256, less = true): string {
    if (!content) return ''
    if (content.length > least && less) {
      let lessContent = content.substring(0, least)
      let lastLinkIndex = lessContent.lastIndexOf('<a')
      let lastEndlinkIndex = lessContent.lastIndexOf('</a>')
      let actIndex = lastLinkIndex > lastEndlinkIndex ? lastLinkIndex : least // avoid to cut tag !!
      lessContent = lessContent.substring(0, actIndex) + ' ...'
      return lessContent
    } else {
      return content
    }
  }
}

@Pipe({name: 'md'})
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    })
    
    const renderer = new marked.Renderer()
    
    const paragraphParse: (text: string) => string = text => `<p>\n${text}</p>`
    
    const linkParse = (href: string, title: string, text: string) => {
      const isSelf = href.includes('ruthub.com')
      const textIsImage = text.includes('<img')
      return `<a href="${href}" target="_blank"
                 title="${title || (textIsImage ? href : text)}" 
                 ${isSelf ? '' : 'rel="external nofollow noopener noreferrer"'}>
                 ${text}</a>`.replace(/\s+/g, ' ').replace('\n', '')
    }
    
    const imageParse = (src: string, title: string, alt: string) => {
      return `<a href="${src}" 
                 target="_blank" rel="nofollow noopener noreferrer">
                <img src="${src}" 
                    referrerPolicy="no-referrer" 
                    title="${title || alt || 'RutHub'}" 
                    style="width:10%; height:15%"
                    alt="${alt || title || src}"/>
              </a>`.replace(/\s+/g, ' ').replace('\n', '')
    }
    
    const headingParse = (text: string, level: number) => {
      let realLevel = level + 2
      return '<h' + realLevel + '>' + text + '</h' + realLevel + '>\n'
    }
    
    renderer.link = linkParse
    renderer.image = imageParse
    renderer.paragraph = paragraphParse
    renderer.heading = headingParse

    return marked(content, { renderer });
  }
}
