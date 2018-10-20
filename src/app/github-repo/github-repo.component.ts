import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  styleUrls: ['./github-repo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepoComponent {
}
