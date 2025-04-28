import UrlRepository from "@/repositories/UrlRepository";
import shortId from 'shortid'

export class UrlShortnerService{
    private UrlRepository;
    constructor(){
        this.UrlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl?: string) : Promise<string>{
        if(!originalUrl){
            return "";
        }
        let url = await this.UrlRepository.getUrlByOriginalUrl(originalUrl);
        if(url){
            return url.shortUrl;
        }

        let shortUrl = shortId();
        url = await this.UrlRepository.getUrlByShortUrl(shortUrl);
        while(url){
            shortUrl = shortId();
            url = await this.UrlRepository.getUrlByShortUrl(shortUrl);
        }

        await this.UrlRepository.createUrl(originalUrl, `urls/${shortUrl}`);
        return shortUrl;
    }

    async getAllUrls(){
        return await this.UrlRepository.getAllUrls();
    }

    async getUrlByShortUrl(shortUrl: string){
        return await this.UrlRepository.getUrlByShortUrl(shortUrl);
    }

    //TODO
    
}