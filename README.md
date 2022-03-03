# EkipcoUi

Ekipco firmasına ait code challenge kaynak kodlarıdır. 

[Catalogue-API](https://github.com/ekipco/Catalogue-API/) kullanılarak back-end'i çalıştırılır.

## Development

Projeyi klonladıktan sonra `nmp install` komutu çalıştırılır.

Daha sonra projeyi localhost'ta ayağa kaldırmak için `ng serve` komutu çalıştırılır.

## Notlar

### NgrxBaseEffects

Ngrx effectlerini module'de import etmeyi tercih etmedim. Eğer module üzerinde import edersek module load olduğunda effect subscriptionları çalışıyor ve uygulama boyunca unsubscribe olmuyor.

NgrxBaseEffects ile her component kendi effect'ini init aşamasında ekliyor ve component destroy olduğunda hem state'i hem de subscription'lar siliniyor. Eğer state'te sürekli durmasını istediğimiz bir veri değil ise bu şekilde kullanmak tarayıcı performansı açısından daha iyi oluyor.


### LayoutModule.setNavigation(key,[])

Projede şu an tek bir module var. Ancak birden fazla olması durumunda navigation linklerini load olan module'e göre değiştirmek isteyebiliriz. Bunu sağlayabilmek için InjectionToken ve Ngrx RouterStore'ı kullandım. 

Nasıl çalışır?

`LayoutModule.setNavigation('key',[...items])` kullandığımızda parametre olarak belirtilen key ile beraber token değerine atanır. Daha sonra routerReducer'da url path kontrol edilerek store'a currentNavigation set edilir. NavbarComponent ise linkleri oluşturmak için store'daki bu değeri kullanır.


#### Olsa iyi olurdu dediğim ama yapmadıklarım....

- State'lerdeki loadingleri kullanarak skeleton component'lar yazılabilirdi. Veriler yüklenirken sayfa boş kalmazdı.
- CommonModule, ReactiveComponentModule vb. gibi her module'de kullanılan module'ler için shared bir module yazılabilirdi.
- Ngrx'te verileri state'e record olarak koymak yerine @ngrx/entity kullanılabilirdi.
- Bütün store'larda kullandığım initialize, initialized, destroy action'larını her seferinde reducerda yazmak yerine metareducer yazılabilirdi.
- Navigation linklerini denemek için shopping'ten harici empty bir module daha yazılabilirdi. (Module'e göre linklerin değişmesini denemedim. Çalışacağını düşünüyorum.)
- Ürünlerin listelendiği sayfada ürünler animation stagger ile görsel olarak daha iyi şekilde enter edilebilirdi.
