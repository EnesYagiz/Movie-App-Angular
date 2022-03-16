import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { AlertifyService } from '../services/alertify.service';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movie.service';
import { ImageValidator } from '../validators/image.validators';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit {

  categories: Category[];
  model: any = {
    categoryId: ''
  };
  constructor(private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe(data => this.categories = data);
  }

  movieForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(5)]),
    description: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required, ImageValidator.isValidExtention]),
    categoryId: new FormControl("", [Validators.required])
  })

  get title() {
    return this.movieForm.get("title");
  }

  get imageUrl() {
    return this.movieForm.get("imageUrl");
  }

  clearForm() {
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: ''
    });
  }

  createMovie() {
    // console.log(this.movieForm);
    // console.log(this.movieForm.value);
    // console.log(this.movieForm.value.title);
    // if (title.value === "" || description.value === "" || imageUrl.value === "" || categoryId.value === "-1") {
    //   this.alertify.warning("Tüm Bilgileri girmelisiniz.");
    //   return;
    // }
    // if (title.value.length < 5) {
    //   this.alertify.warning("Başlık 5 Karakterden Küçük Olmamalıdır.");
    // }
    // if (description.value.length < 10 || description.value.length > 50) {
    //   this.alertify.warning("Açıklama En Az 10 En Fazla 50 Karakter Olmalıdır");
    //   return;
    // }
    // const extensions=[ "jpeg","jpg","png"];
    // const extension=imageUrl.value.split('.').pop();
    const movie = {
      id: 0,
      title: this.movieForm.value.title,
      description: this.movieForm.value.description,
      imageUrl: this.movieForm.value.imageUrl,
      isPopular: false,
      datePublished: new Date().getTime(),
      categoryId: this.movieForm.value.categoryId
      // categoryId Html Select Olarak Tanımlandığında number stringe atanamaz hatası geliyor
    };
    this.movieService.createMovie(movie).subscribe(data =>{
      this.router.navigate(['/movies'])
    });
  }
  log(value: any) {

    console.log(value);
  }

}
