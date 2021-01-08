import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { strict } from 'assert';
import { of, timer, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apero } from '../../models/apero';
import { Vote } from '../../models/vote';
import { RestaurantsService } from '../../services/restaurants.service';
import { VotesService } from '../../services/votes.service';

@Component({
    selector: 'app-apero-detail',
    templateUrl: './apero-detail.component.html',
    styleUrls: ['./apero-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AperoDetailComponent implements OnInit, OnDestroy {
    private selectedAperoIdSubscription: Subscription;
    public selectedAperoid: number = undefined;
    public selectedAperoChanges: Observable<Apero>;
    public isLoading = true;

    // List of Columns names
    public columns: Observable<{ prop: string }[]> = undefined;

    // List of rows, 1 row = 1 person
    public rows: Observable<any> = undefined;

    private rawVotesSubject: BehaviorSubject<Vote[]> = new BehaviorSubject<Vote[]>([]);
    private rawVotes: Observable<Vote[]> = this.rawVotesSubject.asObservable();

    constructor(
        public readonly activatedRoute: ActivatedRoute,
        public readonly aperoService: RestaurantsService,
        private readonly votesService: VotesService,
    ) {
        this.selectedAperoIdSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedAperoid = Number(params['id']);
        });

        this.selectedAperoChanges = this.aperoService.aperosChanges.pipe(
            map((p: Apero[]) =>
                p.find((apero: Apero) => {
                    return apero.id === this.selectedAperoid;
                }),
            ),
        );
    }

    public ngOnDestroy(): void {
        this.selectedAperoIdSubscription.unsubscribe();
    }

    public ngOnInit(): void {
        this.refreshVotes();
        this.columns = this.rawVotes.pipe(
            map((v: Vote[]) => {
                console.log(v);
                return v.reduce(
                    (acc: { prop: string }[], current: Vote) => {
                        if (!acc.find((e: { prop: string }) => e.prop === current.place.nom)) {
                            acc.push({ prop: current.place.nom });
                        }
                        return acc;
                    },
                    [{ prop: 'Nom' }],
                );
            }),
        );

        this.rows = this.rawVotes.pipe(
            map((v: Vote[]) => {
                const initWithNames = v
                    .map((vote: Vote) => {
                        return {
                            Nom: vote.user.nom,
                        };
                    })
                    .filter((elem: { Nom: string }, index: number, self: { Nom: string }[]): boolean => {
                        return index === self.indexOf(elem);
                    });
                return v.reduce((acc: any[], current: Vote) => {
                    const indexUserProp: number = acc.findIndex(
                        (e: any) => e.hasOwnProperty(current.place.nom) && e['Nom'] === current.user.nom,
                    );
                    const indexUser = acc.findIndex((e: any) => e['Nom'] === current.user.nom);
                    if (indexUserProp === -1) {
                        acc[indexUser][current.place.nom] = true;
                    }
                    return acc;
                }, initWithNames);
            }),
        );
        timer(1000).subscribe(async e => {
            this.rows.subscribe(e => console.log(e));
        });
    }

    public refreshVotes(): void {
        this.votesService.getVotes(this.selectedAperoid).subscribe((e: Vote[]) => {
            this.rawVotesSubject.next(e);
            this.isLoading = false;
        });
    }
}
