export namespace main {
	
	export class Note {
	    id: string;
	    title: string;
	    content: string;
	    color: string;
	    date: string;
	    createdAt: string;
	    updatedAt: string;
	    deleted: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Note(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.content = source["content"];
	        this.color = source["color"];
	        this.date = source["date"];
	        this.createdAt = source["createdAt"];
	        this.updatedAt = source["updatedAt"];
	        this.deleted = source["deleted"];
	    }
	}

}

