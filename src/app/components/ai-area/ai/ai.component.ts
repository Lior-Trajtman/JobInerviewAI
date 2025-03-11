import { Component } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { OutputComponent } from "../output/output.component";
import { DetailsModel } from '../../../models/details.model';
import { QnaModel } from '../../../models/qna.model';
import { PromptEngineeringService } from '../../../services/prompt-engineering.service';
import { GptService } from '../../../services/gpt.service';

@Component({
  selector: 'app-ai',
  imports: [InputComponent, OutputComponent],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})
export class AiComponent {

  public qnas: QnaModel[] = null;

  public constructor(private promptEngineeringService: PromptEngineeringService, private gptService: GptService) {}
  
  public async send(details: DetailsModel){

    try{

      this.qnas = [];

      const prompt = this.promptEngineeringService.createPrompt(details);

      const completion = await this.gptService.getCompletion(prompt);

      const json = this.extractJson(completion);

      this.qnas = JSON.parse(json)
      
    }
    catch (err:any){
      alert(err.message);
    }
  }

  private extractJson(completion: string): string{
    const index1 = completion.indexOf("[");
    const index2 = completion.lastIndexOf("]");
    const json = completion.substring(index1, index2 + 1);
    return json;
  }
}
