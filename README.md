# Angular-MvpVm
This project is a proof of concept for using an IOC Container within Angular using the MVP-VM
pattern.

## Architecture
UML Documentation will be created using [Enterprise Architect](https://sparxsystems.com/products/ea/index.html).  A free viewer is available
at [this Sparx Systems link](https://www.sparxsystems.com/bin/EALite.msi)

![MVP-VM Overview](./artifacts/docs/images/readme/mvpvm-overview.png)


## What is MVP-VM?
 * [MVPVM Design Pattern for WPF](https://docs.microsoft.com/en-us/archive/msdn-magazine/2011/december/mvpvm-design-pattern-the-model-view-presenter-viewmodel-design-pattern-for-wpf)

 Lnks in above document:
 * [GUI Architectures](https://www.martinfowler.com/eaaDev/uiArchs.html)
 * [Twisting the Triad](http://www.object-arts.com/downloads/papers/TwistingTheTriad.PDF)
 * [Potel Paper](https://pdfs.semanticscholar.org/ee70/65c3970b4c27d9d4bfa57ab45ba545481232.pdf?_ga=2.133151502.1054465415.1579366097-297204280.1579366097)
 * [Trygve Reenskaugh Model-View-Controllers](http://heim.ifi.uio.no/~trygver/1979/mvc-2/1979-12-MVC.pdf)
 * [Whatsa Controller Anyway](http://wiki.c2.com/?WhatsaControllerAnyway)
 * [Applications Programming in Smalltalk-80: How to Use Model-View-Controller (MVC)](http://www.dgp.toronto.edu/~dwigdor/teaching/csc2524/2012_F/papers/mvc.pdf)
 * [An Introduction to GUI Programming with UIL and Motif](https://www.cs.nmsu.edu/~rth/cs/cs177/s98/IntroUIL2.html)
 * [John Gossman (father of MVVM) PresentationModel and WPF](https://docs.microsoft.com/en-us/archive/blogs/johngossman/presentationmodel-and-wpf)

 

The Model-View-Presenter (MVP) pattern was created to solve issues with the Model-View-Controller (MVC) pattern.   Where the above article was for WPF, the pattern applies to any framework that 
has a view and view model (the view observes the view model for changes and displays them).

It applies to WPF and it applies to Angular.

The View-ViewModel pattern introduces issues with reusability, communication, and separation of concerns.  For example, ViewModel(s) quickly become the "driver" for populating its properties via services - once this happens they are tighly coupled to those services and cannot be reused in other modules that may require different services.  MVP-VM solves this problem as the Presenter becomees the  "driver" and is the only component that is tightly coupled; the views and view models can remain loosely coupled and reused throughout the system.

# History - learning from past mistakes
To understand MVP-VM you have to understand the origin of MVC and why it evolved to MVP; you have to know your history.

## MVC 
Imagine a time where as a developer you placed text boxes on the screen (a form) and you had to control what text box was active so that you could place the blinking cursor in it and performing binding, i.e.when data was input you had to update the associated field/property on the view's Model with the input data.  In a nutshell that is the function of a "controller" and the pattern was called Model-View-Controller.

Later, Microsoft introduces smart controls; you no longer had to manage input controls - the work was automagically done for you.  Without the controller the pattern became View-Model (because the controller was no longer required).

Martin Fowler, one of our great architects, wrote in his article on [GUI Architectures](https://www.martinfowler.com/eaaDev/uiArchs.html) the problem with the View-ViewModel and coined the terms when discussing this pattern:
 * ApplicationModel
 * PresentationModel

 Just as with the View-View Model with WPF, Angular also has a View-ViewModel (aka ApplicationModel, PresentationModel).  The distinction between the ApplicationModel and PresentationModel is that the ApplicationModel was seen "as a bit of dirty work" because it was allowed to access the view, where the PresentationModel has no knowledge of the view (no way to update it). 

 In essense, if you understand your MVC history you can see that WPF's MVVM and Angular's View-ViewModel are the MVC PresentationModel Pattern and we share the same issues today, that they encountered then with this pattern.

Martin Fowler explains the short-comings of the PresentationModel pattern and the need for the Model-View-Presenter pattern (MVP).

## MVP

The MVP-VM pattern is in essence the MVP pattern.  It is the Presenter that communicates with the services and uses the data to populate the ViewModel.   This permits the ViewModel to remain decoupled and generic (easy to reuse).   Likewise Views can be reused with other ViewModels as long as the meet the minimum contract, i.e., the ViewModel holds the properties expected by the View.

## ANGULAR MVP-VM
Is a POC solution that will attempt to apply the principles of MVP-VM.
 * Cross cutting concerns such as communication will be handled with event aggregation
 * ViewModels will have no knowledge of other ViewModel (loosely coupled)
 * Views have no knowlege of their ViewModel
 * ViewModels have no knowledge of their View or Services.
 * The Presenter is the only component that communicates with the BLL
 * The BLL is the only layer that communicates with Services
 * Services is the only layer that communicates with the Model

This separation permits reuse and has a strong dependency on Event Aggregation and  Inversion Of Control (IOC), aka Dependency Injection (DI)


## Visual Studio Code
This project is configured to edit with Visual Studio code providing the ability to launch
both the live editing server [Launch Chrome] as well as test scripts [Launch Chrome (test)] 

![Launch Chrome](./artifacts/docs/images/readme/Launch-Chrome.png)

![Launch Test](./artifacts/docs/images/readme/Launch-test.png)

